
export interface ProjectInfo {
    name: string;
    description: string;
    external_url: string;
    goal: string;
    socials: { instagram: string, twitter: string, youtube: string, facebook: string }
}
export const defaultProjectInfo: ProjectInfo = {
    name: "", description: "", external_url: "", goal: '',
    socials: { instagram: "", twitter: "", youtube: "", facebook: '' }
}

export const ProjectInfoTypes = {
    Social: [
        { name: "twitter", type: "string" },
        { name: "instagram", type: "string" },
        { name: "youtube", type: "string" },
        { name: "facebook", type: "string" }
    ],
    Project: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'external_url', type: 'string' },
        { name: 'goal', type: 'string' },
        { name: 'socials', type: 'Social' },
    ]
};
