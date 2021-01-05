<?php

namespace App\Security;

use App\Controller\SetTokenController;
use App\Service\RequestDataService;
use App\Service\UserTokenService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class TokenAuthenticator extends AbstractGuardAuthenticator
{
    private UserTokenService $userTokenService;
    private RequestDataService $requestDataService;
    private UserProviderInterface $userProvider;

    public function __construct(UserTokenService $userTokenService, RequestDataService $requestDataService, UserProviderInterface $userProvider)
    {
        $this->userTokenService = $userTokenService;
        $this->requestDataService = $requestDataService;
        $this->userProvider = $userProvider;
    }

    /**
     * Called on every request. Return whatever credentials you want to
     * be passed to getUser(). Returning null will cause this authenticator
     * to be skipped.
     */
    public function getCredentials(Request $request)
    {
        // What you return here will be passed to getUser() as $credentials
        return [
            'token' => $request->headers->get('token'),
            'username' => $request->headers->get('username'),
            'serverId' => $request->headers->get('serverId'),
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if (!$credentials['username']) {
            return null;
        }

        // if a User object, checkCredentials() is called
        return $userProvider->loadUserByUsername($credentials['username']);
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        $token = $credentials['token'];

        if (null === $token || null === $credentials['serverId']) {
            return false;
        }

        if ($user->getToken() === NULL) {
            $this->userTokenService->changeTokenOfUser($user->getUsername(), $credentials['token']);
        }

        if ($credentials['token'] !== $user->getToken()) {
            return false;
        }

        $allowedServers = $user->getServers();
        $currentServer = null;

        foreach ($allowedServers as $server) {
            if ($server->getServerId() === $credentials['serverId']) {
                $currentServer = $server;
            }
        }

        if ($currentServer === null) {
            return false;
        }

        $this->requestDataService->setData([
            "server" => $currentServer,
        ]);

        // check credentials - e.g. make sure the password is valid
        // no credential check is needed in this case

        // return true to cause authentication success
        return true;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        // on success, let the request continue
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $data = array(
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        );

        return new JsonResponse($data, Response::HTTP_FORBIDDEN);
    }

    /**
     * Called when authentication is needed, but it's not sent
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        $data = array(
            // you might translate this message
            'message' => 'Authentication Required',
        );

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function supportsRememberMe()
    {
        return false;
    }

    public function supports(Request $request)
    {
        $testingInBrowser = false;

        if ($testingInBrowser) {
            $username = 'test';
            $serverIndexOfUser = 0;

            $this->requestDataService->setData([
                "server" => $this->userProvider->loadUserByUsername($username)->getServers()[$serverIndexOfUser],
            ]);
            return false;
        }

        return true;
    }
}
