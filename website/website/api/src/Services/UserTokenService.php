<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManager;


class UserTokenService
{
    private EntityManager $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function changeTokenOfUser(string $username, string $token)
    {
        $user = $this->em->getRepository(User::class)->findBy(["username" => $username]);
        $user[0]->setToken($token);
        $this->em->persist($user[0]);

        $this->em->flush();
    }
}
