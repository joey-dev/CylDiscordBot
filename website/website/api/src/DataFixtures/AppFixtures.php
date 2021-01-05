<?php

namespace App\DataFixtures;

use App\Entity\Channel;
use App\Entity\Command;
use App\Entity\Roles;
use App\Entity\Server;
use App\Entity\User;
use App\Entity\Welcome;
use App\Entity\WelcomeMessages;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private Server $mainServer;
    private Command $serverCommand;

    public function load(ObjectManager $manager): void
    {
        $this->loadUsers($manager);
        $this->loadCommands($manager);
        $this->loadRoles($manager);
        $this->loadWelcome($manager);
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
                $this->serverCommand = $command;
            }
            $manager->persist($command);
        }

        $manager->flush();
    }

    private function loadRoles(ObjectManager $manager): void
    {
        $role = new Roles();
        $role->setName("adminRole");
        $role->setRoleId("795749571967582218");
        $role->addCommand($this->serverCommand);
        $role->setServer($this->mainServer);

        $manager->persist($role);

        $manager->flush();
    }

    private function loadWelcome(ObjectManager $manager): void
    {
        $welcome = new Welcome();
        $welcome->setEnabled(true);
        $welcome->setDiscordServerId("796010336821051402");
        $welcome->setServer($this->mainServer);

        $role = new Roles();
        $role->setServer($this->mainServer);
        $role->setRoleId("796025329696899072");
        $role->setName("welcome");
        $role->addWelcome($welcome);

        $welcomeMessage = new WelcomeMessages();
        $welcomeMessage->setMessage("Welcome //name// to the server!");
        $welcomeMessage->setWelcome($welcome);

        $manager->persist($welcome);
        $manager->persist($role);
        $manager->persist($welcomeMessage);
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
