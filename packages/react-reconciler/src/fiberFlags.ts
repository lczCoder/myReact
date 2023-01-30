/** fiber中用来标记对应dom操作 */

export type Flags = number;

export const NoFlags = /*                      */ 0b000000000000000000000000; // 无操作
export const Placement = /*                    */ 0b000000000000000000000010; // 创建
export const Update = /*                       */ 0b000000000000000000000100; // 更新
export const ChildDeletion = /*                */ 0b000000000000000000001000; // 删除
