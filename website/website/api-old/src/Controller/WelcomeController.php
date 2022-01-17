<?php

namespace App\Controller;

use App\Service\RequestDataService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class WelcomeController
 * @package App\Controller
 * @Route("/api/welcome", name="api_welcome_")
 */
class WelcomeController extends AbstractController
{
    private EntityManagerInterface $em;
    private RequestDataService $requestDataService;

    public function __construct(EntityManagerInterface $em, RequestDataService $requestDataService)
    {
        $this->em = $em;
        $this->requestDataService = $requestDataService;
    }

    /**
     * @Route("/", name="data")
     */
    public function data(): Response
    {
        $server = $this->requestDataService->getData()['server'];
        $welcome = $server->getWelcome();

        $messages = [];
        foreach ($welcome->getWelcomeMessages() as $message) {
            $messages[] = $message->getMessage();
        }

        $roles = [];
        foreach ($welcome->getRoles() as $role) {
            $roles[] = $role->getRoleId();
        }

        return new JsonResponse([
            "channelId" => $welcome->getDiscordServerId(),
            "messages" => $messages,
            "roles" => $roles,
            "enabled" => $welcome->getEnabled(),
        ]);
    }
}
