import icon from "../renderer/images/conta icon white.png";

export const SideBar = ({
  children,
  isBack,
}: {
  children: React.ReactNode;
  isBack: boolean;
}) => {
  return (
    <div className="sidebar-container">
      {isBack ? (
        <i
          className="bi bi-chevron-left go-back"
          onClick={() => {
            let href = window.location.href;
            let len = href.length - 1;
            while (len >= 0) {
              let element = href.charAt(len - 1);
              href = href.slice(0, len - 1);
              if (element == "/") {
                break;
              }
              len--;
            }
            window.location.href = href;
          }}
        />
      ) : undefined}
      <div className="sidebar-options">
        <img
          className="sidebar-logo"
          src={icon}
          alt=""
          onClick={() => {
            window.location.href = "/";
          }}
        />
        {children}
      </div>
    </div>
  );
};

export const SideBarOption = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick(): void;
}) => {
  return (
    <div className="sidebar-option" onClick={handleClick}>
      {children}
    </div>
  );
};
