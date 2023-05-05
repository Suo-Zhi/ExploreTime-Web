export interface UpsertTreeNodeDTO {
    treeId: number;
    parentNodeId: number | null;
    order: number;
    nodeId: number;
}
