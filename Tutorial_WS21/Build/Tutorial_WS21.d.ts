declare namespace Tutorial_WS21 {
    function Introduction(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS21 {
    function Scene2(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS21 {
    function Scene3(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS21 {
    function End(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS21 {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transitions: {
        clock: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let sound: {
        backgroundTheme: string;
        click: string;
    };
    let locations: {
        bedroom: {
            name: string;
            background: string;
        };
        kitchen: {
            name: string;
            background: string;
        };
    };
    let characters: {
        narrator: {
            name: string;
        };
        aisaka: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                angry: string;
                happy: string;
                upset: string;
            };
        };
        kohana: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                angry: string;
                happy: string;
                upset: string;
            };
        };
    };
    function fromRightToOutOfCanvas(): ƒS.AnimationDefinition;
    function fromRightToLeft(): ƒS.AnimationDefinition;
    let dataForSave: {
        nameProtagonist: string;
        points: number;
    };
    function incrementSound(): void;
    function decrementSound(): void;
}
