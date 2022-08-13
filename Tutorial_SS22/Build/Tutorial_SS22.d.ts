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
        bedroomAtNight: {
            name: string;
            background: string;
        };
        bathroom: {
            name: string;
            background: string;
        };
        bathroomFoggy: {
            name: string;
            background: string;
        };
        radio: {
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
        blobRED: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
        blobBU: {
            name: string;
            description: string;
            image: string;
        };
        blobDKBU: {
            name: string;
            description: string;
            image: string;
        };
        blobGN: {
            name: string;
            description: string;
            image: string;
        };
        blobPK: {
            name: string;
            description: string;
            image: string;
        };
        blobYL: {
            name: string;
            description: string;
            image: string;
        };
        blobOG: {
            name: string;
            description: string;
            image: string;
        };
    };
    let dataForSave: {
        nameProtagonist: string;
        aisakaScore: number;
        scoreForAisaka: string;
        randomPoints: number;
        pickedAnimationScene: boolean;
        pickedInventoryScene: boolean;
        pickedMeterScene: boolean;
        pickedChoice: boolean;
    };
    function showCredits(): void;
    function ghostAnimation(): ƒS.AnimationDefinition;
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
    function BadEnding(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function Empty(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function GoodEnding(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToAnimate(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToMakeAMeterBar(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToMakeAnInventory(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToMakeChoices(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToMakeChoices2(): ƒS.SceneReturn;
}
declare namespace Tutorial_SS22 {
    function HowToText(): ƒS.SceneReturn;
}
