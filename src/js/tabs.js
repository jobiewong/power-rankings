const container = document.body;
      const tabOne = document.querySelector(".link1");
      const tabTwo = document.querySelector(".link2");
      const tabs = document.querySelectorAll(".link");

      const contentWrap = document.querySelector(".content-wrapper")
      tabOne.classList.add("tabone");
      tabOne.addEventListener("click", () => {
        contentWrap.classList.add("contentLeft")
        contentWrap.classList.remove("contentRight")

        tabOne.classList.add("tabone");
        tabTwo.classList.remove("tabone");
      });
      tabTwo.addEventListener("click", () => {
        contentWrap.classList.add("contentRight")
        contentWrap.classList.remove("contentLeft")

        tabTwo.classList.add("tabone");
        tabOne.classList.remove("tabone");
      });
