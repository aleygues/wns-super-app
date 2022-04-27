import { Arg, Authorized, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Project, ProjectInput } from "../models/Project";
import { User } from "../models/User";

@Resolver(Project)
export class ProjectsResolver {
    private projectRepo = getRepository(Project);
    private userRepo = getRepository(User);

    @Query(() => [Project])
    async getProjects(): Promise<Project[]> {
        return await this.projectRepo.find();
    }

    @Authorized()
    @Mutation(() => Project)
    async createProject(@Arg('data', () => ProjectInput) data: ProjectInput, @Ctx() context: { user: User }): Promise<Project> {
        const newProject = this.projectRepo.create(data);

        const user = await this.userRepo.findOne(context.user.id);
        newProject.createBy = user;

        await newProject.save();
        return newProject;
    }
}