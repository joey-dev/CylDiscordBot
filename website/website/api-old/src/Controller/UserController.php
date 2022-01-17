<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class UserController
 * @package App\Controller
 * @Route("/api/users", name="api_users_")
 */
class UserController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/", name="all")
     */
    public function all(): Response
    {
        return new JsonResponse([
            "username" => "no problem",
        ]);
    }

    /**
     * @Route("/{id}", name="id")
     * @param string $id
     * @return Response
     */
    public function byId(string $id): Response
    {
        $user = $this->em->getRepository(User::class)->find($id);

        return new JsonResponse([
            "username" => $user->getUsername(),
        ]);
    }
}
