<?php

namespace App\DataFixtures;

use App\Entity\Server;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
    }

    public function loadUsers(ObjectManager $manager)
    {
        $mainServer = $this->createMainServer();
        $mainUser = $this->createMainUser($mainServer);

        $manager->persist($mainServer);
        $manager->persist($mainUser);
        $manager->flush();
    }

    private function createMainServer(): Server
    {
        $server = new Server();
        $server->setName("Joey's bot test");
        $server->setServerId("794988966590808124");

        return $server;
    }

    private function createMainUser(Server $server): User
    {
        $user = new User();
        $user->setUsername("test");
        $user->setPassword("test123");
        $user->addServer($server);

        return $user;
    }
}
