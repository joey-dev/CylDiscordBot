<?php

namespace App\Entity;

use App\Repository\CommandRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommandRepository::class)]
class Command
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\ManyToMany(targetEntity: Server::class, inversedBy: 'commands')]
    private $server;

    #[ORM\ManyToMany(targetEntity: Role::class, mappedBy: 'command')]
    private $roles;

    public function __construct()
    {
        $this->server = new ArrayCollection();
        $this->roles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    /**
     * @return Collection|Role[]
     */
    public function getRoles(): Collection
    {
        return $this->roles;
    }

    public function addRole(Role $role): self
    {
        if (!$this->roles->contains($role)) {
            $this->roles[] = $role;
            $role->addCommand($this);
        }

        return $this;
    }

    public function removeRole(Role $role): self
    {
        if ($this->roles->removeElement($role)) {
            $role->removeCommand($this);
        }

        return $this;
    }
}
