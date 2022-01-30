<?php

namespace App\Controller;

use App\Entity\Module;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/module', name: 'module_')]
class ModuleController extends AbstractController
{
    #[Route('/all', name: 'all', methods: ["GET"])]
    public function all(ManagerRegistry $doctrine): Response
    {
        $modules = $this->getAllModules($doctrine);

        if (!$modules) {
            return new JsonResponse([
                "error" => "no modules",
                "error_message" => "could not find any modules"
            ], Response::HTTP_BAD_REQUEST);
        }

        $returnArray = [];

        foreach ($modules as $module) {
            $returnArray[] = [
                "id" => $module->getId(),
                "name" => $module->getName(),
            ];
        }

        return new JsonResponse($returnArray, Response::HTTP_OK);
    }

    #[Route('/all/full', name: 'all_full')]
    public function allFull(ManagerRegistry $doctrine): Response
    {
        $modules = $this->getAllModules($doctrine);

        if (!$modules) {
            return new JsonResponse([
                "error" => "no modules",
                "error_message" => "could not find any modules"
            ], Response::HTTP_BAD_REQUEST);
        }

        $returnArray = [];

        foreach ($modules as $module) {
            $plugins = [];
            foreach ($module->getPlugins() as $plugin) {
                $components = [];
                foreach ($plugin->getComponents() as $component) {
                    $components[] = [
                        "id" => $component->getId(),
                        "name" => $component->getName(),
                        "order_id" => $component->getOrderId(),
                        "data" => $component->getData(),
                        "type" => $component->getType()->getName(),
                    ];
                }
                $plugins[] = [
                    "id" => $plugin->getId(),
                    "name" => $plugin->getName(),
                    "order_id" => $plugin->getOrderId(),
                    "components" => $components,
                ];
            }
            $returnArray[] = [
                "id" => $module->getId(),
                "name" => $module->getName(),
                "plugins" => $plugins,
            ];
        }

        return new JsonResponse($returnArray, Response::HTTP_OK);
    }

    /**
     * @return Module[]
     */
    private function getAllModules(ManagerRegistry $doctrine): array
    {
        return $doctrine->getRepository(Module::class)->findBy([], ['order_id' => 'ASC']);
    }
}
