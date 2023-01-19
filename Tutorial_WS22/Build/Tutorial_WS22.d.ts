declare namespace Tutorial_WS22 {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transition: {
        puzzle: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let sound: {
        drop: string;
    };
    let locations: {
        beachDay: {
            name: string;
            background: string;
        };
        beachEvening: {
            name: string;
            background: string;
        };
    };
    let characters: {
        narrator: {
            name: string;
        };
        protagonist: {
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
    };
    let items: {
        egg: {
            name: string;
            description: string;
            image: string;
        };
    };
    function getAnimation(): ƒS.AnimationDefinition;
    let dataForSave: {
        nameProtagonist: string;
        interrupt: boolean;
        aisakaPoints: number;
        pickedOk: boolean;
        pickedMeterBar: boolean;
        aisakaScore: number;
    };
    function horizontalShake(): Promise<void>;
    function verticalShake(): Promise<void>;
}
declare namespace Tutorial_WS22 {
    function Text(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS22 {
    function Choices(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS22 {
    function Animations(): ƒS.SceneReturn;
}
declare namespace Tutorial_WS22 {
    function MeterBar(): ƒS.SceneReturn;
}
