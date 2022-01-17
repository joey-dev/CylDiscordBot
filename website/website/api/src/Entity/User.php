<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $username;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $token;

    #[ORM\ManyToMany(targetEntity: Server::class, inversedBy: 'users')]
    private $server;

    public function __construct()
    {
        $this->server = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return Collection|Server[]
     */
    public function getServer(): Collection
    {
        return $this->server;
    }

    public function addServer(Server $server): self
    {
        if (!$this->server->contains($server)) {
            $this->server[] = $server;
        }

        return $this;
    }

    public function removeServer(Server $server): self
    {
        $this->server->removeElement($server);

        return $this;
    }
}
