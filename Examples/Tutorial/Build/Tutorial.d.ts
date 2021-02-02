declare namespace Tutorial {
    function Main(): ƒS.SceneReturn;
}
declare namespace Tutorial {
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
            origin: ƒS.ORIGIN;
            pose: {
                normal: string;
            };
        };
    };
    let scenes: ƒS.Scenes;
}
