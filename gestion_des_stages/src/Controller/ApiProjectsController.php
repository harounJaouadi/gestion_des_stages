<?php

namespace App\Controller;

use App\Entity\Project;
use Exception;
use App\Repository\ProjectRepository;
use App\Repository\SupervisorRepository;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiProjectsController extends AbstractController
{
    private $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    #[Route('/api/projects', name: 'displayProject', methods: ["GET"])]
    public function displayProjects(ProjectRepository $projectRep)
    {
        try {
            $projects = $projectRep->findAll();

            return $this->json($projects, 200, [], ["groups" => "project:read"]);
        } catch (Exception $exception) {
            return $this->json([
                "status" => "400",
                "message" => $exception->getMessage()
            ]);
        }
    }
    #[Route('/api/projects', name: 'addProject', methods: ["POST"])]

    public function addProject(
        Request $req,
        SerializerInterface $serializer,
        ProjectRepository $projectRep,
        ValidatorInterface $validator

    ) {
        $content = $req->getContent();

        try {
            $project = $serializer->deserialize($content, Project::class, "json");

            if ($project->getName() && !$projectRep->findOneBy(["name" => $project->getName()])) {

                $errors = $validator->validate($project);
                if (count($errors) > 0) {
                    return $this->json($errors, 400);
                }

                $this->em->persist($project);
                $this->em->flush();
                return $this->json($project, 201, [], ["groups" => "project:read"]);
            } else {
                return $this->json(
                    [
                        "status"  => "201",
                        "message" => "you must provide a different name"
                    ],
                    201
                );
            }
        } catch (Exception $exception) {
            return $this->json([
                "status" => "404",
                "message" => $exception->getMessage()
            ], 404);
        }
    }

    #[Route('/api/projects', name: 'modifyProject', methods: ["PATCH"])]
    public function modify(Request $req, ProjectRepository $projectRep)
    {
        $content = $req->getContent();
        try {
            $projectOb = json_decode($content);

            if (isset($projectOb->id) && $projectRep->find($projectOb->id)) {
                $project = $projectRep->find($projectOb->id);
                isset($projectOb->name) && $project->setName($projectOb->name);
                isset($projectOb->field) && $project->setField($projectOb->field);
                isset($projectOb->internNumber) && $project->setInternNumber($projectOb->internNumber);
                isset($projectOb->duration) && $project->setDuration($projectOb->duration);
                $this->em->flush();
                return $this->json($project, 201, [], ["groups" => "project:read"]);
            } else {
                return $this->json(
                    [
                        "status"  => "304",
                        "message" => "you must provide a valid id "
                    ],
                    201
                );
            }
        } catch (Exception $exception) {
            return $this->json(
                [
                    "status"  => "400",
                    "message" => "internId or project does not exist "
                ],
                400

            );
        }
    }
    #[Route('/api/projects', name: 'deleteProject', methods: ["delete"])]
    public function deleteProject(Request $req, ProjectRepository $projectRep)
    {
        $content = $req->getContent();
        try {

            if (isset(json_decode($content)->id) && $projectRep->find(json_decode($content)->id)) {
                $projectId = json_decode($content)->id;
                $project = $projectRep->find($projectId);

                $this->em->remove($project);
                $this->em->flush();
                return $this->json($project, 201, [], ["groups" => "project:read"]);
            } else {
                return $this->json([
                    "status" => 400,
                    "message" => "problem in the id "
                ]);
            }
        } catch (Exception $exception) {
            return $this->json([
                "status" => 400,
                "message" => $exception->getMessage()
            ], 400);
        }
    }
    #[Route('/api/project/setSupervisor', name: 'setSupervisor', methods: ["patch"])]
    public function setSupervisor(Request $req, ProjectRepository $projectRep,SupervisorRepository $supervisorRep )
    {
        $content = $req->getContent();
        try {
            $projectOb = json_decode($content);
            if (!isset($projectOb->id) || !isset($projectOb->supervisor) || !isset($projectOb->supervisor->id)) {
                return $this->json([
                    "status" => 400,
                    "message" => "problem in the request "
                ]);
            } else {
                $project = $projectRep->find($projectOb->id);
                $supervisor=$supervisorRep->find($projectOb->supervisor->id) ; 
                if ($project && $supervisor) {
                    $project->setSupervisor($supervisor) ;
                    $this->em->flush() ;
                    return $this->json($project, 201, [], ["groups" => "project:read"]); 

                } else {
                    return $this->json([
                        "status" => 400,
                        "message" => "problem in the id "
                    ]);
                }
            }
        } catch (Exception $exception) {
            return $this->json([
                "status" => 400,
                "message" => $exception->getMessage()
            ], 400);
        }
    }
}
