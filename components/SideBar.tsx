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
      {isBack ? <i className="bi bi-chevron-left go-back" /> : undefined}
      <div className="sidebar-options">
        <img
          className="sidebar-logo"
          src={icon}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        {children}
      </div>
    </div>
  );
};

export const SideBarOption = ({ children }: { children: React.ReactNode }) => {
  return <div className="sidebar-option">{children}</div>;
};
