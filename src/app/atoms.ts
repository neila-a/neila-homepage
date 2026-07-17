import {
    atom
} from "jotai";
import innerText from "react-innertext";
import projectCategories from "../../data/projects/categories.json";
import projects from "../../data/projects";
import contacts from "../../data/contacts";
export const
    searchTextAtom = atom("");
const searchFilterAtom = atom(get => <T>(
    origins: T[],
    processor: (toProcess: T) => string[]
) => origins.filter(origin => processor(origin).some(text => text.toLowerCase().includes(get(searchTextAtom).toLowerCase()))));
export const
    categorizedProjectsAtom = atom(get => {
        const searched = get(searchFilterAtom)(projects, project => [
            project.name,
            innerText(project.description),
            "translatedName" in project && project.translatedName
        ].filter(
            text => typeof text === "string"
        ));
        return Object.fromEntries(projectCategories.map(([category]) => [
            category,
            searched.filter(project => project.category === category)
        ]));
    }),
    searchedContactsAtom = atom(get => get(searchFilterAtom)(contacts, Object.values));
