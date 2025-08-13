(() => {
  // App.jsx
  var App = () => {
    const now = /* @__PURE__ */ new Date();
    const a = 10;
    const b = 20;
    console.log(now, a + b);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Hello world, it is ", now.toString()), /* @__PURE__ */ React.createElement("p", null, a, " plus ", b, " is ", a + b));
  };
  var App_default = App;
})();
