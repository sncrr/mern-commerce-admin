import { Link, useLocation } from "react-router-dom";
import { colors } from "../../../theme";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import { NavSubList } from "./NavSubList";
import { NavSubItem } from "./NavSubItem";
import { styled } from "styled-components";
import { sidebarNavigations } from "../../../root/paths";
import { useEffect } from "react";

const ICON_SIZE = 32;
const ICON_COLOR = colors.black;
const ICON_ACTIVE_COLOR = colors.active;

interface Props {}

const Container = styled.aside`
  background-color: ${colors.white};
  height: calc(100vh - 5rem);
  width: 7rem;
  position: fixed;
  z-index: 20;
  top: 5rem;
  left: 0;
  border-right: 0.3rem solid ${colors.navBorder};
`;

export const Sidebar = ({}: Props) => {
  const location = useLocation();

  const getIsActive = (item: any) => {
    if (item.path) return location.pathname.includes(item.path);
    else if (item.children)
      for (let child of item.children)
        if (location.pathname.includes(child.path)) return true;

    return false;
  };

  useEffect(() => {
    for(let item of sidebarNavigations) {
      if(item.children && item.children.length > 0) {
        getChildrenGroups(item);
      }
    }
  }, [])

  const getChildrenGroups = (listItem: any) => {
    let groups:any = [
      {
        label: listItem.label,
        children: []
      }
    ];

    for(let child of listItem.children) {

      let groupLabel = child.group ? child.group : listItem.label;

      let group = groups.find((item:any) => item.label == groupLabel);

      if(!group) {
        group = {
          label: groupLabel,
          children: [],
        }
        groups.push(group);
      }
      
      group.children.push(child);
    }

    return groups;
  }

  return (
    <Container>
      <NavList>
        {sidebarNavigations.map((item, index) => {
          let isActive = getIsActive(item);

          return (
            <NavListItem
              key={index}
              className="nav-list-item"
              $isActive={isActive}
            >
              {item.children ? (
                <div>
                  <item.icon
                    color={isActive ? ICON_ACTIVE_COLOR : ICON_COLOR}
                    size={ICON_SIZE}
                  />
                  <span>{item.label}</span>
                  <NavSubList>
                    {
                      getChildrenGroups(item).map((group: any, index: number) => (
                        <div key={index}>
                          <div className="title">{group.label}</div>
                          {group.children.map((child:any, childIndex: number) => (
                            <NavSubItem key={childIndex}>
                              <Link to={child.path}>{child.label}</Link>
                            </NavSubItem>
                          ))}
                        </div>
                      ))
                    }
                  </NavSubList>
                  
                </div>
              ) : (
                <Link to={item.path}>
                  <item.icon
                    color={isActive ? ICON_ACTIVE_COLOR : ICON_COLOR}
                    size={ICON_SIZE}
                  />
                  <span>{item.label}</span>
                </Link>
              )}
            </NavListItem>
          );
        })}
      </NavList>
    </Container>
  );
};
