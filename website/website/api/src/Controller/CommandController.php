<?php

namespace App\Controller;

use App\Entity\Command;
use App\Entity\Roles;
use App\Service\RequestDataService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CommandController
 * @package App\Controller
 * @Route("/api/commands", name="api_commands_")
 */
class CommandController extends AbstractController
{
    private EntityManagerInterface $em;
    private RequestDataService $requestDataService;

    public function __construct(EntityManagerInterface $em, RequestDataService $requestDataService)
    {
        $this->em = $em;
        $this->requestDataService = $requestDataService;
    }

    /**
     * @Route("/status", name="status")
     * @return Response
     */
    public function statusAll(): Response
    {
        $server = $this->requestDataService->getData()['server'];
        $commands = $this->em->getRepository(Command::class)->findAll();

        $returnList = [];

        foreach ($commands as $command) {
            $status = $server->getCommands()->contains($command);
            $roleNames = [];

            foreach ($command->getRoles() as $role) {
                $roleNames[] = $role->getName();
            }

            $row = [];
            $row["commandName"] = $command->getName();
            $row["status"] = $status ? "enabled" : "disabled";
            $row["roles"] = $roleNames;

            $returnList[] = $row;
        }

        return new JsonResponse($returnList);
    }

    /**
     * @Route("/status/{name}/enabled", name="status_enabled", methods={"PATCH"})
     * @param string $name
     * @return Response
     */
    public function changeToEnabled(string $name): Response
    {
        $server = $this->requestDataService->getData()['server'];
        $commands = $this->em->getRepository(Command::class)->findAll();
        $changingCommand = null;

        foreach ($commands as $command) {
            if ($command->getName() === $name) {
                $changingCommand = $command;
            }
        }

        if ($changingCommand !== null) {
            $server->addCommand($changingCommand);
            $this->em->persist($server);
            $this->em->flush();
        }

        return new JsonResponse([
            "enabled" => true,
        ]);
    }

    /**
     * @Route("/status/{name}/disabled", name="status_disabled", methods={"PATCH"})
     * @param string $name
     * @return Response
     */
    public function changeToDisabled(string $name): Response
    {
        $server = $this->requestDataService->getData()['server'];
        $commands = $server->getCommands();
        $changingCommand = null;

        foreach ($commands as $command) {
            if ($command->getName() === $name) {
                $changingCommand = $command;
            }
        }

        if ($changingCommand !== null) {
            $server->removeCommand($changingCommand);
            $this->em->persist($server);
            $this->em->flush();
        }

        return new JsonResponse([
            "disabled" => true,
        ]);
    }

    /**
     * @Route("/enabled/{name}", name="enabled")
     * @param string $name
     * @return Response
     */
    public function enabled(string $name): Response
    {
        $server = $this->requestDataService->getData()['server'];
        $command = $this->em->getRepository(Command::class)->findOneBy(["name" => $name]);

        if ($command !== null && $server->getCommands()->contains($command)) {
            return new JsonResponse([
                "enabled" => true,
            ]);
        }

        return new JsonResponse([
            "enabled" => false,
        ]);
    }

    /**
     * @Route("/permissions/{name}", name="permissions")
     * @param Request $request
     * @param string  $name
     * @return Response
     * @throws \JsonException
     */
    public function permissions(Request $request, string $name): Response
    {
        $requestData = $request->getContent();
        $requestDataAsStdClass = json_decode($requestData);
        $command = $this->em->getRepository(Command::class)->findOneBy(["name" => $name]);

        $roleIds = $requestDataAsStdClass->roleIds;

        $roleFound = false;

        if ($command !== null) {
            foreach ($command->getRoles() as $role) {
                if (in_array($role->getRoleId(), $roleIds, true)) {
                    $roleFound = true;
                }
            }
        }

        if ($roleFound) {
            return new JsonResponse([
                "gotPermissions" => true,
            ]);
        }

        return new JsonResponse([
            "gotPermissions" => false,
        ]);
    }

    /**
     * @Route("/role/add/{name}", name="role_add")
     * @param Request $request
     * @param string  $name
     * @return Response
     */
    public function addRole(Request $request, string $name): Response
    {
        $server = $this->requestDataService->getData()['server'];

        $requestData = $request->getContent();
        $requestDataAsStdClass = json_decode($requestData);

        $role = new Roles();
        $role->setName($requestDataAsStdClass->roleName);
        $role->setRoleId($requestDataAsStdClass->roleId);
        $role->setServer($server);

        $commands = $this->em->getRepository(Command::class)->findAll();
        $changingCommand = null;

        foreach ($commands as $command) {
            if ($command->getName() === $name) {
                $changingCommand = $command;
            }
        }

        $changingCommand->addRole($role);

        $this->em->persist($role);
        $this->em->persist($changingCommand);

        $this->em->flush();

        return new JsonResponse([
            "success" => true,
        ]);
    }

    /**
     * @Route("/role/remove/{name}", name="role_remove")
     * @param Request $request
     * @param string  $name
     * @return Response
     */
    public function removeRole(Request $request, string $name): Response
    {
        $em = $this->em;
        $server = $this->requestDataService->getData()['server'];

        $requestData = $request->getContent();
        $requestDataAsStdClass = json_decode($requestData);

        $commands = $server->getCommands();
        $changingCommand = null;
        $changingRole = null;

        foreach ($commands as $command) {
            if ($command->getName() === $name) {
                $changingCommand = $command;
            }
        }

        foreach ($changingCommand->getRoles() as $role) {
            if ($role->getRoleId() === $requestDataAsStdClass->roleId) {
                $em->remove($role);
            }
        }
        $em->flush();

        return new JsonResponse([
            "success" => true,
        ]);
    }
}
