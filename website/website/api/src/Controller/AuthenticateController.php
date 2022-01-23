<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\DBAL\Exception;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\AcceptHeader;

class AuthenticateController extends AbstractController
{
    private HttpClientInterface $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
//        header("Access-Control-Allow-Origin: *");
    }

    #[Route('/authenticate/check', name: 'authenticate')]
    public function check(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!array_key_exists("code", $data)) {
            return new JsonResponse([
                "error" => "invalid_request",
                "error_description" => "no code in request",
            ]);
        }

        $code = $data['code'];

        $url = 'https://discord.com/api/v8/oauth2/token';

        $options = [
            'headers' => [
                "Content-type" => " application/x-www-form-urlencoded",
            ],
            'body' => [
                "client_id" => '794964425819160587',
                "client_secret" => 'imXvPXhSOltnCD1J2ngOOfrMQUxJR5AX',
                "grant_type" => 'authorization_code',
                "redirect_uri" => 'http://localhost:3000/auth/redirect',
                "code" => $code,
            ],
        ];

        $response = $this->client->request(
            'POST',
            $url,
            $options
        );

        if ($response->getStatusCode() === 400) {
            return new JsonResponse([
                "status_code" => $response->getStatusCode(),
                "error" => "invalid_request",
                "error_description" => "Invalid item in request. (probably code)",
            ]);
        }

        $result = json_decode($response->getContent(), true);

        if ($result === FALSE || array_key_exists('error', $result)) {
            return new JsonResponse([
                "error" => "invalid_request",
                "error_description" => "Invalid code in request.",
            ]);
        }

        $responseUser = $this->client->request(
            "GET",
            "https://discord.com/api/v8/users/@me",
            [
                'headers' => [
                    "Authorization" => "Bearer " . $result["access_token"]
                ],
            ]
        );

        $resultUser = json_decode($responseUser->getContent(), true);
        $entityManager = $doctrine->getManager();

        $user = $doctrine->getRepository(User::class)->findOneBy(['user_id' => $resultUser['id']]);


        if ($user instanceof User) {
            $user->setToken($result["access_token"]);
            $user->setUsername($resultUser['username']);
            $user->setRefreshToken($result['refresh_token']);
            $user->setTokenExpiresIn(strtotime("now") + $result['expires_in']);
        } else {
            $user = new User();
            $user->setUserId($resultUser['id']);
            $user->setToken($result["access_token"]);
            $user->setUsername($resultUser['username']);
            $user->setRefreshToken($result['refresh_token']);
            $user->setTokenExpiresIn(strtotime("now") + $request['expires_in']);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            "data" => [
                "access_token" => $result["access_token"],
                "token_type" => $result["token_type"],
                "expires_in" => $result["expires_in"],
                "refresh_token" => $result["refresh_token"],
                "scope" => $result["scope"],
            ],
            "user" => [
                "id" => $user->getId(),
                "username" => $resultUser['username'],
                "token" => $result['access_token'],
                "user_id" => $resultUser['id']
            ]
        ]);

    }
}
