
/**
 * 映射: GridLayoutMode → {xs,sm,md,lg,ls} 
 */
export const mapGridAttrs: Record<GridLayoutMode, GridLayoutAttrs> = {
    fullrow: { xs: 12, sm: 12, md: 12 },
    item123: { xs: 12, sm: 6, md: 4 },
    item122: { xs: 12, sm: 6, md: 6 },
    item223: { xs: 6, sm: 6, md: 4 }
}
