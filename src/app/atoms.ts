import {
    atom
} from "jotai";
import projects from "../../data/projects/index";
import innerText from "react-innertext";
import projectCategories from "../../data/projects/categories.json"
export const
    searchTextAtom = atom(""),
    categorizedProjectsAtom = atom(get => {
        const searched = projects.filter(project => [
            project.name,
            innerText(project.description),
            // @ts-expect-error 
            project?.translatedName
        ].filter(
            text => typeof text === "string"
        ).some(
            text => text.toLowerCase().includes(get(searchTextAtom).toLowerCase())
        ));
        return Object.fromEntries(projectCategories.map(([category]) => [
            category,
            searched.filter(project => project.category === category)
        ]));
    });
