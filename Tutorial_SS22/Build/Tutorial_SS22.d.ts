declare namespace Tutorial_SS22 {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transitions: {
        puzzle: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let sound: {
        nightclub: string;
    };
    let locations: {
        nightpark: {
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
    let items: {
        BlobRED: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
        BlobBU: {
            name: string;
            description: string;
            image: string;
        };
        BlobDKBU: {
            name: string;
            description: string;
            image: string;
        };
        BlobGN: {
            name: string;
            description: string;
            image: string;
        };
        BlobPK: {
            name: string;
            description: string;
            image: string;
        };
        BlobYL: {
            name: string;
            description: string;
            image: string;
        };
        BlobOG: {
            name: string;
            description: string;
            image: string;
        };
        Stick: {
            name: string;
            description: string;
            image: string;
        };
    };
    let dataForSave: {
        nameProtagonist: string;
        score: {
            scoreOne: number;
            scoreTwo: number;
            scoreThree: number;
        };
        pickedAnimationScene: boolean;
    };
    function showCredits(): void;
    function leftToRight(): ƒS.AnimationDefinition;
}
declare namespace Tutorial_SS22 {
    let textAusgelagert: {
        Narrator: {
            T0000: string;
            T0001: string;
            T0002: string;
        };
        Aisaka: {
            T0000: string;
            T0001: string;
        };
    };
}
declare namespace Tutorial_SS22 {
    function EndingOne(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function EndingTwo(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function GameOver(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToAnimate(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToMakeAnInventory(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToMakeChoices(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToText(): ƒS.SceneReturn;
}
