<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ServerController extends AbstractController
{
    #[Route('/server/user/{id}', name: 'server_user')]
    public function user(ManagerRegistry $doctrine, int $id): Response
    {
        $user = $doctrine->getRepository(User::class)->find($id);

        $servers = [];

        foreach ($user->getServer() as $server) {
            $servers[] = [
                "server_id" => $server->getServerId(),
                "name" => $server->getName()
            ];
        }

        return $this->json([
            'servers' => $servers,
        ]);
    }
}
