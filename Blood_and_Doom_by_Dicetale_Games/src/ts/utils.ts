/**
 * Wrapper for startRoll with better typing and less string madness
 * @param template Name of the roll template to use
 * @param attributes Object containing non-rolled attributes (things not wrapped in [[]])
 * @param rolls Actual rolls, which are passed to the callback as the results
 * @param callback Callback. Gets a {rollId, results} argument. Call finishRoll from here.
 */
function myStartRoll<T extends string>(
    template: string,
    attributes: { [key: string]: string },
    rolls: { [key in T]: string },
    callback?: RollCallback<T>
): void {
    startRoll(
        `&{template:${template}} ${Object.entries(attributes)
            .map(([k, v]) => `{{${k}=${v}}}`)
            .join(' ')} ${Object.entries(rolls)
            .map(([k, v]) => `{{${k}=[[${v}]]}}`)
            .join(' ')}`,
        callback
    );
}
