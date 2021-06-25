declare namespace Test {
    function Main(): ƒS.SceneReturn;
}
declare namespace Test {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transitions: {
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
    let sound: {
        backgroundTheme: string;
        shoot: string;
    };
    let locations: {
        city: {
            name: string;
            background: string;
        };
    };
    let characters: {
        Sue: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
            };
        };
    };
    let items: {
        Fudge: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
    };
    let state: {
        a: number;
        b: string;
        c: number;
    };
    function getAnimation(): ƒS.AnimationDefinition;
}
