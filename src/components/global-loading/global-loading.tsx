import "./global-loading.css";

export function GlobalLoading() {
  return (
    <div
      id="page-spinner"
      className="pg-loading-screen pg-loading"
      style={{ backgroundColor: "rgb(250, 250, 250)" }}
    >
      <div className="pg-loading-inner">
        <div className="pg-loading-center-outer">
          <div className="pg-loading-center-middle">
            <h1 className="pg-loading-logo-header">
              <img
                className="pg-loading-logo"
                src="https://predykt.com/img/title.png"
                alt="logo"
              />
            </h1>
            <div className="pg-loading-html pg-loaded">
              <p className="loading-message"></p>
              <div className="sk-spinner sk-spinner-wave">
                <div
                  className="sk-rect1"
                  style={{ backgroundColor: "rgb(0, 0, 0)" }}
                ></div>
                <div
                  className="sk-rect2"
                  style={{ backgroundColor: "rgb(0, 0, 0)" }}
                ></div>
                <div
                  className="sk-rect3"
                  style={{ backgroundColor: "rgb(0, 0, 0)" }}
                ></div>
                <div
                  className="sk-rect4"
                  style={{ backgroundColor: "rgb(0, 0, 0)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
