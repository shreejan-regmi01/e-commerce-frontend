import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/services/category.service";
import { buildCategoryTree } from "@/lib/buildCategoryTree";
import { CategoryTree } from "@/types/category";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function NavBar() {
  const categories = await getCategories();
  const categoryTree = buildCategoryTree(categories);

  return (
    <>
      <NavigationMenu className="px-12 pb-0.5">
        <NavigationMenuList>
          {categoryTree.map((category) => {
            const hasChildren =
              category.children && category.children.length > 0;
            return (
              <NavigationMenuItem key={category.id}>
                {hasChildren ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <NavigationMenuTrigger className="focus-visible:ring-0 focus-visible:outline-0">
                        {category.name}
                      </NavigationMenuTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {category.children.map((child) => (
                        <CategoryDropdownItem key={child.id} category={child} />
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <NavigationMenuLink
                    href={`/category/${category.slug}`}
                    className="font-semibold"
                  >
                    {category.name}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </>
  );
}

function CategoryDropdownItem({ category }: { category: CategoryTree }) {
  const hasChildren = category.children && category.children.length > 0;

  // render a menu item with cursor along with sub-menu if the selected category has children
  if (hasChildren) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="cursor-pointer">
          <Link
            href={`/category/${category.slug}`}
            className="cursor-pointer w-full"
          >
            {category.name}
          </Link>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {category.children.map((child) => (
              <CategoryDropdownItem key={child.id} category={child} />
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }

  // render standalone link as a base case
  return (
    <DropdownMenuItem asChild>
      <Link
        href={`/category/${category.slug}`}
        className="cursor-pointer w-full"
      >
        {category.name}
      </Link>
    </DropdownMenuItem>
  );
}
