<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ServerController extends AbstractController
{
    private HttpClientInterface $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    #[Route('/user/servers', name: 'server_user', methods: ["GET"])]
    public function user(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $userId = $request->headers->get('user_id');

        $user = $doctrine->getRepository(User::class)->findOneBy(['user_id' => $userId]);

        $alreadyJoinedServersIds = [];

        foreach ($user->getServer() as $server) {
            $alreadyJoinedServersIds[] = $server->getServerId();
        }

        $servers = $this->getServersFromDiscordApi($request);
        $availableServers = [];

        foreach ($servers as $server) {
            if ($server['owner'] || $server['permissions'] == "2199023255551") {
                $server['alreadyJoined'] = in_array($server['id'], $alreadyJoinedServersIds);
                $availableServers[] = $server;
            }
        }

        return new JsonResponse([
            'servers' => $availableServers,
        ]);
    }

    private function getServersFromDiscordApi(Request $request): array {
        $apiToken = $request->headers->get('Authorization');
        $authorizationToken = explode(" ", $apiToken)[1];

        $responseUser = $this->client->request(
            "GET",
            "https://discord.com/api/v8/users/@me/guilds",
            [
                'headers' => [
                    "Authorization" => "Bearer " . $authorizationToken
                ],
            ]
        );

        return json_decode($responseUser->getContent(), true);
    }
}
