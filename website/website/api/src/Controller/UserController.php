<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/user/{id}', name: 'user', methods: ["GET"])]
    public function user(Request $request, ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $user = $doctrine->getRepository(User::class)->findOneBy(['user_id' => $id]);

        if (!($user instanceof User)) {
            return new JsonResponse([
                'error' => 400,
                'error_message' => 'user not found',
            ]);
        }

        // if token in header is the same as the user in the database
        $fullAuthorizationToken = $request->headers->get("Authorization");

        if (!$fullAuthorizationToken) {
            return new JsonResponse([
                'error' => 400,
                'error_message' => 'token not found',
            ]);
        }

        $authorizationToken = explode(" ", $fullAuthorizationToken)[1];

        if ($authorizationToken != $user->getToken()) {
            return new JsonResponse([
                'error' => 400,
                'error_message' => 'token incorrect',
            ]);
        }


        return new JsonResponse([
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "token" => $user->getToken(),
            "user_id" => $user->getUserId()
        ]);
    }
}
