<?php

namespace App\Controller;

use App\Entity\Command;
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
                "enabled" => true
            ]);
        }

        return new JsonResponse([
            "enabled" => false
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
                "gotPermissions" => true
            ]);
        }

        return new JsonResponse([
            "gotPermissions" => false
        ]);
    }
}
