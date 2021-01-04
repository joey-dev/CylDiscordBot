<?php

namespace App\Controller;

use App\Service\RequestDataService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class UserController
 * @package App\Controller
 * @Route("/api/servers", name="api_servers_")
 */
class ServerController extends AbstractController
{
    private EntityManagerInterface $em;
    private RequestDataService $requestDataService;

    public function __construct(EntityManagerInterface $em, RequestDataService $requestDataService)
    {
        $this->em = $em;
        $this->requestDataService = $requestDataService;
    }

    /**
     * @Route("/this", name="this")
     */
    public function all(): Response
    {
        $server = $this->requestDataService->getData()['server'];

        return new JsonResponse([
            "name" => $server->getName(),
            "serverId" => $server->getServerId()
        ]);
    }

}
