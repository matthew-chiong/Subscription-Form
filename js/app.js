const goBackBtn = document.querySelector("#go-back_btn");
const nextStepBtn = document.querySelector("#next-step_btn");
const prevStepBtn = document.querySelector("#go-back_btn");
const navBar = document.querySelector("#side-bar");
const footerCon = document.querySelector("#footer_container");

// if step 1 has current-nav, hide go-back button
const goBackDisplay = () => {
  if (navBar.firstElementChild.className === "side-bar_nav current-nav") {
    goBackBtn.style.display = "none";
  } else {
    goBackBtn.style.display = "block";
  }
};
goBackDisplay();
const moveToStep = (track, currentStep, targetStep) => {
  track.style.transform = `translateX(-` + targetStep.style.left + `)`;
  currentStep.classList.remove("current-step");
  targetStep.classList.add("current-step");
};

// arrange steps-container so they are next to one other
const stepsContainer = document.querySelector(".steps_container");
const stepsArray = Array.from(stepsContainer.children);
const amountToMove = stepsContainer.getBoundingClientRect().width;

stepsArray.forEach((step, index) => {
  step.style.left = amountToMove * index + `px`;
});

// *!PACKAGE ARRAY

const packArray = [
  {
    plan: "",
    planFee: "",
    addOns: [],
    totalPer: "",
    totalAmount: "",
  },
];
let amount = [];
let totalAmountCalc = [];

// *!BUTTON FUNCTION -----------------------------------------
// *! NEXT STEP ----------------------

const stepsConHeight = () => {
  const media480 = window.matchMedia("(min-width:480px)");
  const media768 = window.matchMedia("(min-width:768px)");
  if (media480.matches) {
    stepsContainer.style.minHeight = "720px";
  }
  if (media768.matches) {
    stepsContainer.style.minHeight = "800px";
  }
};

const nextStep = () => {
  nameValidation();
  const currentStep = stepsContainer.querySelector(".current-step");
  const navbarArr = Array.from(navBar.children);
  const currentNavPos = navbarArr.findIndex(
    (x) => x.className === "side-bar_nav current-nav"
  );

  if (currentNavPos === 1) {
    stepsContainer.style.minHeight = "660px";
    stepsConHeight();
    console.log("HI");
  } else {
    stepsContainer.style.minHeight = "570px";
  }
  chosenPlan();
  chosenAddOns();
  finishingUp();
  if (nextStepBtn.innerHTML === "Confirm") {
    nextStepBtn.style.display = "none";
    prevStepBtn.style.display = "none";
    footerCon.style.backgroundColor = "var(--Magnolia)";
    navBar.style.display = "none";
  }
  if (currentNavPos === 3) {
    checkoutFunc();
    nextStepBtn.innerHTML = "Confirm";
  } else {
    nextStepBtn.innerHTML = "Next Step";
  }
};
// *! GO BACK ----------------------

const goBack = () => {
  const currentNav = navBar.querySelector(".current-nav");
  const currentStep = stepsContainer.querySelector(".current-step");
  const chosenPlanAddOnsCon = document.querySelector(
    "#chosen-plan_ad-ons_container"
  );

  // when i click next, transform: translate steps_container
  const prevStep = currentStep.previousElementSibling;
  moveToStep(stepsContainer, currentStep, prevStep);

  // remove and add class "current-nav"
  const prevNav = currentNav.previousElementSibling;
  ifNull(currentNav, prevNav);

  goBackDisplay();
  const navbarArr = Array.from(navBar.children);
  const currentNavPos = navbarArr.findIndex(
    (x) => x.className === "side-bar_nav current-nav"
  );
  if (currentNavPos === 1) {
    stepsContainer.style.height = "660px";
  } else {
    stepsContainer.style.height = "570px";
  }
  if (currentNavPos === 2) {
    packArray[0].addOns = [];
  }
  chosenPlanAddOnsCon.innerHTML = `
  <li class="chosen-plan_ad-ons">
    <p class="chosen-plan_ad-ons_title">Online service</p>
    <p class="chosen-plan_ad-ons_fee">+$1/mo</p>
  </li>
  <li class="chosen-plan_ad-ons">
    <p class="chosen-plan_ad-ons_title">Larger storage</p>
    <p class="chosen-plan_ad-ons_fee">+$2/mo</p>
  </li>`;
  document.getElementById("check1").checked = false;
  document.querySelector("#check2").checked = false;
  document.getElementById("check3").checked = false;
  if (currentNavPos === 3) {
    checkoutFunc();
    nextStepBtn.innerHTML = "Confirm";
  } else {
    nextStepBtn.innerHTML = "Next Step";
  }
  amount.length = 0;
  totalAmountCalc.length = 0;
};

// *! FIRST STEP ---------------------------------------------------
// *!FORM VALIDATION --------------------

const nameValidation = () => {
  const fullName = document.querySelector("#fullName");
  const fname = document.querySelector(".fullName");
  const fnameAfter = window.getComputedStyle(fname, "::after");

  if (fullName.value === "") {
    fname.style.setProperty("--display", "block");
    fname.style.setProperty("--content", '"This field is required"');
  } else {
    fname.style.setProperty("--display", "none");
    emailValidation();
  }
};

const emailValidation = () => {
  const email = document.querySelector("#email");
  const emailDiv = document.querySelector(".email");
  const emailAfter = window.getComputedStyle(emailDiv, "::after");
  const isValid = email.checkValidity();
  if (email.value === "") {
    emailDiv.style.setProperty("--display", "block");
    emailDiv.style.setProperty("--content", '"This field is required"');
  } else if (!isValid) {
    emailDiv.style.setProperty("--display", "block");
    emailDiv.style.setProperty("--content", '"Email username is not valid"');
  } else {
    emailDiv.style.setProperty("--display", "none");
    phoneValidation();
  }
};
const phone = document.querySelector("#phone");
phone.addEventListener("keyup", (e) => {
  if (
    e.key != "Backspace" &&
    (phone.value.length === 3 || phone.value.length === 7)
  ) {
    phone.value += "-";
  }
});

const ifNull = (current, target) => {
  if (target === null || undefined) {
    return;
  } else {
    // remove and add class "current-nav"
    current.classList.remove("current-nav");
    target.classList.add("current-nav");
  }
};

const phoneValidation = () => {
  const phone = document.querySelector("#phone");
  const phoneDiv = document.querySelector(".phone");
  const phoneAfter = window.getComputedStyle(phoneDiv, "::after");
  const isValid = phone.checkValidity();

  if (phone.value === "") {
    phoneDiv.style.setProperty("--display", "block");
    phoneDiv.style.setProperty("--content", '"This field is required"');
  } else if (!isValid) {
    phoneDiv.style.setProperty("--display", "block");
    phoneDiv.style.setProperty("--content", '"Phone number is not valid"');
  } else {
    phoneDiv.style.setProperty("--display", "none");
    const currentStep = stepsContainer.querySelector(".current-step");

    // when all is good move to next step
    const nextStep = currentStep.nextElementSibling;
    moveToStep(stepsContainer, currentStep, nextStep);
    const currentNav = navBar.querySelector(".current-nav");
    const nextNav = currentNav.nextElementSibling;
    ifNull(currentNav, nextNav);
    goBackDisplay();
  }
};

// *! SECOND STEP ------------------------
// *! SELECT PLAN ------------------------

const plansCon = document.querySelector(".plans_container");
const plansArr = Array.from(plansCon.children);
const plans = plansArr.map((x) => {
  x.addEventListener("click", (e) => {
    const target = e.target.closest("li");
    const activePlan = plansCon.querySelector(".active-plan");

    if (target.className === "plans active-plan") {
      return;
    } else {
      activePlan.classList.remove("active-plan");
      target.classList.add("active-plan");
    }
  });
});

const plansToggle = document.querySelector("#plans-toggle");
const monthly = document.querySelector("#monthly");
const yearly = document.querySelector("#yearly");
const plansMonthly = document.querySelectorAll(".plans_monthly");
const plansYearly = document.querySelectorAll(".plans_yearly");
const plansYearlyFreebie = document.querySelectorAll(".plans_yearly_freebie");
const plansMonthlyArr = Array.from(plansMonthly);
const plansYearlyArr = Array.from(plansYearly);
const plansYearlyFreebieArr = Array.from(plansYearlyFreebie);
const addOnsMonthlyFee = document.querySelectorAll(".add-ons_monthly_fee");
const addOnsMonthlyFeeArr = Array.from(addOnsMonthlyFee);
const addOnsYearlyFee = document.querySelectorAll(".add-ons_yearly_fee");
const addOnsYearlyFeeArr = Array.from(addOnsYearlyFee);

plansToggle.addEventListener("click", (e) => {
  plansToggle.classList.toggle("open");
  monthly.classList.toggle("open");
  yearly.classList.toggle("open");

  if (plansToggle.classList.contains("open")) {
    plansMonthlyArr.map((x) => {
      x.style.display = "none";
    });
    plansYearlyArr.map((x) => {
      x.style.display = "block";
    });
    plansYearlyFreebieArr.map((x) => {
      x.style.display = "block";
    });
    addOnsMonthlyFeeArr.map((x) => {
      x.style.display = "none";
    });
    addOnsYearlyFeeArr.map((x) => {
      x.style.display = "block";
    });
  } else {
    plansMonthlyArr.map((x) => {
      x.style.display = "block";
    });
    plansYearlyArr.map((x) => {
      x.style.display = "none";
    });
    plansYearlyFreebieArr.map((x) => {
      x.style.display = "none";
    });
    addOnsMonthlyFeeArr.map((x) => {
      x.style.display = "block";
    });
    addOnsYearlyFeeArr.map((x) => {
      x.style.display = "none";
    });
  }
});

const navbarArr = Array.from(navBar.children);
const currentNavPos = navbarArr.findIndex(
  (x) => x.className === "side-bar_nav current-nav"
);

const chosenPlan = () => {
  const plansTitle = document.querySelectorAll(".plans_title");
  const plansTitleArr = Array.from(plansTitle);
  const plansConArr = Array.from(plansCon.children);
  const plansPos = plansConArr.findIndex(
    (x) => x.className === "plans active-plan"
  );

  packArray[0].plan = plansTitleArr[plansPos].textContent;
  if (plansToggle.classList.contains("open")) {
    packArray[0].planFee = plansYearlyArr[plansPos].textContent;
  } else {
    packArray[0].planFee = plansMonthlyArr[plansPos].textContent;
  }
};

// *! THIRD STEP -------------------------------------------
// *! SELECT ADDONS --------------------

const chosenAddOns = () => {
  const check = document.querySelectorAll(".check");
  const checkArr = Array.from(check);
  const checkbox1 = document.getElementById("check1");
  const checkbox2 = document.querySelector("#check2");
  const checkbox3 = document.getElementById("check3");

  // tuloy tayo sa ipupush na yung add ons sa packArray

  if (checkbox1.checked) {
    packArray[0].addOns.push({
      addOnsTitle: checkArr[0].children[1].children[0].textContent,
      addOnsMonthly: checkArr[0].children[2].textContent,
      addOnsYearly: checkArr[0].children[3].textContent,
    });
  }
  if (checkbox2.checked) {
    packArray[0].addOns.push({
      addOnsTitle: checkArr[1].children[1].children[0].textContent,
      addOnsMonthly: checkArr[1].children[2].textContent,
      addOnsYearly: checkArr[1].children[3].textContent,
    });
  }
  if (checkbox3.checked) {
    packArray[0].addOns.push({
      addOnsTitle: checkArr[2].children[1].children[0].textContent,
      addOnsMonthly: checkArr[2].children[2].textContent,
      addOnsYearly: checkArr[2].children[3].textContent,
    });
  }
};

// *! FOURTH STEP -------------------------------------------
// *! FINISHING UP --------------------

const chosenPlanName = document.querySelector("#chosen-plan");
const chosenPlanFee = document.querySelector(".chosen-plan_fee");
const checkout = document.querySelector("#checkout");

const chosenPlanAddOnsCon = document.querySelector(
  "#chosen-plan_ad-ons_container"
);
const addOnsArr = packArray[0].addOns;

const finishingUp = () => {
  const search = packArray.find((x) => x);

  if (plansToggle.classList.contains("open")) {
    chosenPlanName.innerHTML = `${packArray[0].plan}` + ` (Yearly)`;
    chosenPlanFee.innerHTML = `${packArray[0].planFee}`;
    chosenPlanAddOnsCon.innerHTML = search.addOns
      .map((x) => {
        return `
    <li class="chosen-plan_ad-ons">
      <p class="chosen-plan_ad-ons_title">${x.addOnsTitle}</p>
      <p class="chosen-plan_ad-ons_fee">${x.addOnsYearly}</p>
    </li>
    `;
      })
      .join("");
    checkout.innerHTML = "Total (per year)";
  } else {
    chosenPlanName.innerHTML = `${packArray[0].plan}` + ` (Monthly)`;
    chosenPlanFee.innerHTML = `${packArray[0].planFee}`;
    chosenPlanAddOnsCon.innerHTML = search.addOns
      .map((x) => {
        return `
  <li class="chosen-plan_ad-ons">
    <p class="chosen-plan_ad-ons_title">${x.addOnsTitle}</p>
    <p class="chosen-plan_ad-ons_fee">${x.addOnsMonthly}</p>
  </li>
  `;
      })
      .join("");
    checkout.innerHTML = "Total (per month)";
  }
};

const checkoutFunc = () => {
  const checkoutAmount = document.querySelector(".checkout-amount");

  if (plansToggle.classList.contains("open")) {
    amount.push(packArray[0].planFee);
    const adOnsFee = document.querySelectorAll(".chosen-plan_ad-ons_fee");
    const adOnsFeeArr = Array.from(adOnsFee);
    adOnsFeeArr.map((x) => {
      amount.push(x.textContent);
    });
    amount.map((x) => {
      const reduce = parseFloat(
        x.replace("+", "").replace("$", "").replace("/yr", "")
      );
      totalAmountCalc.push(reduce);
      const total = totalAmountCalc.reduce((a, b) => a + b, 0);
      const search = packArray.find((x) => x);
      search.totalAmount = `$` + total + "/yr";
      checkoutAmount.innerHTML = search.totalAmount;
    });
  } else {
    amount.push(packArray[0].planFee);
    const adOnsFee = document.querySelectorAll(".chosen-plan_ad-ons_fee");
    const adOnsFeeArr = Array.from(adOnsFee);
    adOnsFeeArr.map((x) => {
      amount.push(x.textContent);
    });
    amount.map((x) => {
      const reduce = parseFloat(
        x.replace("+", "").replace("$", "").replace("/mo", "")
      );
      totalAmountCalc.push(reduce);
      const total = totalAmountCalc.reduce((a, b) => a + b, 0);
      const search = packArray.find((x) => x);
      search.totalAmount = `$` + total + "/mo";
      checkoutAmount.innerHTML = search.totalAmount;
    });
  }
};

// *! FINAL STEP -------------------------------------------
// *! THANK YOU! --------------------
