const Scene = require("Scene");
const NativeUI = require("NativeUI");
const TouchGestures = require("TouchGestures");
const Diagnostics = require("Diagnostics");

(async function () {
  const PASSWORD = "123456";
  const CANVAS_OBJECT_NAME = "canvasPassword";
  const EFFECT_OBJECT_NAME = "rootEffect"; // REQUIRED
  const TAP_OBJECT_NAME = "tapObject"; // REQUIRED

  const CANVAS_OBJECT = await Scene.root.findFirst(CANVAS_OBJECT_NAME);
  const EFFECT_OBJECT = await Scene.root.findFirst(EFFECT_OBJECT_NAME);
  const TAP_OBJECT = await Scene.root.findFirst(TAP_OBJECT_NAME);

  EFFECT_OBJECT.hidden = true;
  NativeUI.setText(CANVAS_OBJECT_NAME, "");

  TouchGestures.onTap().subscribe(function () {
    NativeUI.enterTextEditMode(CANVAS_OBJECT_NAME);
  });

//   TouchGestures.onTap(TAP_OBJECT).subscribe(function () {
//     NativeUI.enterTextEditMode(CANVAS_OBJECT_NAME);
//   });

  NativeUI.getText(CANVAS_OBJECT_NAME)
    .monitor()
    .subscribe(async function (textUpdate) {
      Diagnostics.log(`sparkar: pass inputed = ${textUpdate.newValue}`);
      const PASSWORD_INPUTED = textUpdate.newValue;

      if (PASSWORD_INPUTED === PASSWORD) {
        Diagnostics.log("sparkar: access success");

        CANVAS_OBJECT.hidden = true;
        EFFECT_OBJECT.hidden = false;
      } else {
        Diagnostics.log("sparkar: access denied");
        NativeUI.setText(CANVAS_OBJECT_NAME, "");
      }
    });

  Diagnostics.log("sparkar: by Ismael Ash");
})();
