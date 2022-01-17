<?php

namespace App\Entity;

use App\Repository\WelcomeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WelcomeRepository::class)]
class Welcome
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToOne(inversedBy: 'welcome', targetEntity: Server::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private $server;

    #[ORM\Column(type: 'boolean')]
    private $enabled;

    #[ORM\Column(type: 'string', length: 255)]
    private $channel_id;

    #[ORM\Column(type: 'text', nullable: true)]
    private $messageData;

    #[ORM\Column(type: 'text', nullable: true)]
    private $elements;

    #[ORM\Column(type: 'text', nullable: true)]
    private $privateMessageData;

    #[ORM\Column(type: 'text', nullable: true)]
    private $PrivateElements;

    #[ORM\OneToMany(mappedBy: 'welcome', targetEntity: Role::class)]
    private $role;

    public function __construct()
    {
        $this->role = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServer(): ?Server
    {
        return $this->server;
    }

    public function setServer(Server $server): self
    {
        $this->server = $server;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getChannelId(): ?string
    {
        return $this->channel_id;
    }

    public function setChannelId(string $channel_id): self
    {
        $this->channel_id = $channel_id;

        return $this;
    }

    public function getMessageData(): ?string
    {
        return $this->messageData;
    }

    public function setMessageData(?string $messageData): self
    {
        $this->messageData = $messageData;

        return $this;
    }

    public function getElements(): ?string
    {
        return $this->elements;
    }

    public function setElements(?string $elements): self
    {
        $this->elements = $elements;

        return $this;
    }

    public function getPrivateMessageData(): ?string
    {
        return $this->privateMessageData;
    }

    public function setPrivateMessageData(?string $privateMessageData): self
    {
        $this->privateMessageData = $privateMessageData;

        return $this;
    }

    public function getPrivateElements(): ?string
    {
        return $this->PrivateElements;
    }

    public function setPrivateElements(?string $PrivateElements): self
    {
        $this->PrivateElements = $PrivateElements;

        return $this;
    }

    /**
     * @return Collection|Role[]
     */
    public function getRole(): Collection
    {
        return $this->role;
    }

    public function addRole(Role $role): self
    {
        if (!$this->role->contains($role)) {
            $this->role[] = $role;
            $role->setWelcome($this);
        }

        return $this;
    }

    public function removeRole(Role $role): self
    {
        if ($this->role->removeElement($role)) {
            // set the owning side to null (unless already changed)
            if ($role->getWelcome() === $this) {
                $role->setWelcome(null);
            }
        }

        return $this;
    }
}
