declare namespace Tutorial {
    function Animation(): ƒS.SceneReturn;
}
declare namespace Tutorial {
    function Tutorial(): ƒS.SceneReturn;
}
declare namespace Tutorial {
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
        Narrator: {
            name: string;
        };
        Sue: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
            };
        };
    };
    let scenes: ƒS.Scenes;
}
