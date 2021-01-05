<?php

namespace App\Entity;

use App\Repository\CommandRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CommandRepository::class)
 */
class Command
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
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=Server::class, mappedBy="Command")
     */
    private $Servers;

    /**
     * @ORM\ManyToMany(targetEntity=Roles::class, inversedBy="Commands")
     */
    private $Roles;

    public function __construct()
    {
        $this->Servers = new ArrayCollection();
        $this->Roles = new ArrayCollection();
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
    public function getServers(): Collection
    {
        return $this->Servers;
    }

    public function addServer(Server $Server): self
    {
        if (!$this->Servers->contains($Server)) {
            $this->Servers[] = $Server;
            $Server->addCommand($this);
        }

        return $this;
    }

    public function removeServer(Server $Server): self
    {
        if ($this->Servers->removeElement($Server)) {
            $Server->removeCommand($this);
        }

        return $this;
    }

    /**
     * @return Collection|Roles[]
     */
    public function getRoles(): Collection
    {
        return $this->Roles;
    }

    public function addRole(Roles $role): self
    {
        if (!$this->Roles->contains($role)) {
            $this->Roles[] = $role;
        }

        return $this;
    }

    public function removeRole(Roles $role): self
    {
        $this->Roles->removeElement($role);

        return $this;
    }
}
