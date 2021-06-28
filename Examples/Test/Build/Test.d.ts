declare namespace Test {
    function Main(): ƒS.SceneReturn;
}
declare namespace Test {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    export let transitions: {
        clock: {
            duration: number;
            alpha: string;
            edge: number;
        };
        jigsaw: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    export let sound: {
        backgroundTheme: string;
        shoot: string;
    };
    export let locations: {
        city: {
            name: string;
            background: string;
        };
    };
    export let characters: {
        Sue: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
            };
        };
    };
    export let items: {
        Fudge: {
            name: string;
            description: string;
            image: string;
            static: boolean;
            handler: typeof hndItem;
        };
    };
    export let state: {
        a: number;
        b: string;
        c: number;
    };
    function hndItem(_event: CustomEvent): void;
    export function getAnimation(): ƒS.AnimationDefinition;
    export {};
}
