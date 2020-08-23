export const hideTabs = function () {
  const tabBar = document.querySelector("ion-tab-bar");
  if (tabBar !== null && tabBar.style.display !== "none")
    tabBar.style.display = "none";
};

export const showTabs = function () {
  const tabBar = document.querySelector("ion-tab-bar");
  if (tabBar === null && tabBar.style.display === "none")
    tabBar.style.display = "inline";
};
