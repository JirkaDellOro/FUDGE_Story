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
        window: {
            name: string;
            background: string;
        };
        rain: {
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
                talk: string;
            };
        };
        John: {
            name: string;
            origin: ƒS.ORIGIN;
            pose: {
                normal: string;
                smile: string;
            };
        };
    };
    let scenes: ƒS.Scenes;
}
