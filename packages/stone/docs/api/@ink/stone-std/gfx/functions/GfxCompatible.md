[**InkStone API Documentation**](../../../../README.md)

---

[InkStone API Documentation](../../../../README.md) / [@ink/stone-std](../../README.md) / [gfx](../README.md) / GfxCompatible

# Function: GfxCompatible()

> **GfxCompatible**\<`Props`, `T`\>(`BlockModelSuperClass`): _typeof_ [`GfxBlockElementModel`](../classes/GfxBlockElementModel.md)

Convert a BlockModel to a GfxBlockElementModel.

## Type Parameters

### Props

`Props` _extends_ [`GfxCompatibleProps`](../type-aliases/GfxCompatibleProps.md)

### T

`T` _extends_ `Constructor`\<`BlockModel`\<`Props`\>\> = `Constructor`\<`BlockModel`\<`Props`\>\>

## Parameters

### BlockModelSuperClass

`T`

The BlockModel class to be converted.

## Returns

_typeof_ [`GfxBlockElementModel`](../classes/GfxBlockElementModel.md)

The returned class is a subclass of the GfxBlockElementModel class and the given BlockModelSuperClass.
