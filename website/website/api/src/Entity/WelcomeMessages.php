<?php

namespace App\Entity;

use App\Repository\WelcomeMessagesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=WelcomeMessagesRepository::class)
 */
class WelcomeMessages
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $message;

    /**
     * @ORM\ManyToOne(targetEntity=Welcome::class, inversedBy="welcomeMessages")
     */
    private $Welcome;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getWelcome(): ?Welcome
    {
        return $this->Welcome;
    }

    public function setWelcome(?Welcome $Welcome): self
    {
        $this->Welcome = $Welcome;

        return $this;
    }
}
