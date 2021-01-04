<?php

namespace App\Controller;

use App\Entity\Command;
use App\Service\RequestDataService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
}
