//@todo test drag and drop with mouse

describe("Drag and Drop", () => {
    //@todo fix onmousedown & onmouseup behavior
    //
    // it("can do it", () => {
    //     cy.withConfig((c) => {
    //         c.featureSwitches.undo = false;
    //         c.featureSwitches.confetti = false;
    //         c.featureSwitches.shuffle = false;
    //     }).visit("http://localhost:3000/solitaire");
    //     cy.contains("Single Player").click();
    //     cy.get(".tableau-2").within(() =>
    //         cy
    //             .get(".card")
    //             .last()
    //             .within(() =>
    //                 cy
    //                     .get(".align-left")
    //                     .first()
    //                     .trigger("mousedown")
    //                     .trigger("mousemove", { clientX: 200, clientY: 0 })
    //                     .trigger("mouseup", { force: true })
    //             )
    //     );
    // });
});
