<?php

namespace App\Entity;

use App\Repository\WelcomeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=WelcomeRepository::class)
 */
class Welcome
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Server::class, inversedBy="welcome", cascade={"persist", "remove"})
     */
    private $Server;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $discordServerId;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Enabled;

    /**
     * @ORM\OneToMany(targetEntity=WelcomeMessages::class, mappedBy="Welcome")
     */
    private $welcomeMessages;

    /**
     * @ORM\ManyToMany(targetEntity=Roles::class, inversedBy="welcomes")
     */
    private $Roles;


    public function __construct()
    {
        $this->Server = new ArrayCollection();
        $this->welcomeMessages = new ArrayCollection();
        $this->Roles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServer(): ?Server
    {
        return $this->Server;
    }

    public function setServer(?Server $Server): self
    {
        $this->Server = $Server;

        return $this;
    }

    public function getDiscordServerId(): ?string
    {
        return $this->discordServerId;
    }

    public function setDiscordServerId(string $discordServerId): self
    {
        $this->discordServerId = $discordServerId;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->Enabled;
    }

    public function setEnabled(bool $Enabled): self
    {
        $this->Enabled = $Enabled;

        return $this;
    }

    /**
     * @return Collection|WelcomeMessages[]
     */
    public function getWelcomeMessages(): Collection
    {
        return $this->welcomeMessages;
    }

    public function addWelcomeMessage(WelcomeMessages $welcomeMessage): self
    {
        if (!$this->welcomeMessages->contains($welcomeMessage)) {
            $this->welcomeMessages[] = $welcomeMessage;
            $welcomeMessage->setWelcome($this);
        }

        return $this;
    }

    public function removeWelcomeMessage(WelcomeMessages $welcomeMessage): self
    {
        if ($this->welcomeMessages->removeElement($welcomeMessage)) {
            // set the owning side to null (unless already changed)
            if ($welcomeMessage->getWelcome() === $this) {
                $welcomeMessage->setWelcome(null);
            }
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
