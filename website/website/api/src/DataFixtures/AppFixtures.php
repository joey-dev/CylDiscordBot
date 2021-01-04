<?php

namespace App\DataFixtures;

use App\Entity\Command;
use App\Entity\Server;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private Server $mainServer;

    public function load(ObjectManager $manager): void
    {
        $this->loadUsers($manager);
        $this->loadCommands($manager);
    }

    private function loadUsers(ObjectManager $manager): void
    {
        $mainServer = $this->createMainServer();
        $mainUser = $this->createMainUser($mainServer);

        $this->mainServer = $mainServer;

        $manager->persist($mainServer);
        $manager->persist($mainUser);
        $manager->flush();
    }

    private function loadCommands(ObjectManager $manager): void
    {
        $commandNames = [
            "server",
        ];
        foreach ($commandNames as $commandName) {
            $command = new Command();
            $command->setName($commandName);

            if ($commandName === "server") {
                $command->addServer($this->mainServer);
            }
            $manager->persist($command);
        }

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
