import textwrap

from .helpers import repeat_format, roll, rolltemplate

EXPORTS = {}

# Personality traits
personnality_roll = roll(
    "(@{Personality_Trait$$_Score}) [@{Personality_Trait$$}]",
    "(?{@{circumstantial_i18n}|0}) [@{circumstances_i18n}]",
)
personnality_template = rolltemplate(
    "generic",
    Banner="^{personality} ^{roll}",
    Label="@{Personality_Trait$$}",
    Result=f"[[ %(die)s + {personnality_roll} ]]",
)

EXPORTS["personality_trait_rows"] = repeat_format(
    textwrap.dedent(
        f"""\
        <tr>
            <td><input type="text" class="heading_2" style="width:245px" name="attr_Personality_Trait$$"/></td>
            <td><input type="text" class="number_1" style="width:70px;" name="attr_Personality_Trait$$_score"/></td>
            <td><div class="flex-container-center">
                <button type="roll" class="button simple-roll" name="roll_personality$$_simple" value="{personnality_template.simple}"></button>
                <button type="roll" class="button stress-roll" name="roll_personality$$_stress" value="{personnality_template.stress}"></button>
            </div></td>
        </tr>"""
    ),
    replace="$$",
    by=list(map(str, range(1, 7))),
)


# Reputations
reputation_roll = roll(
    "(@{Reputations$$_Score}) [@{Reputations$$}]",
    "(?{@{circumstantial_i18n}|0}) [@{circumstances_i18n}]",
)
reputation_template = rolltemplate(
    "generic",
    Banner="^{reputation} ^{roll}",
    Label="@{Reputations$$}",
    Result=f"[[ %(die)s + {reputation_roll} ]]",
)
EXPORTS["reputation_rows"] = repeat_format(
    textwrap.dedent(
        f"""\
        <tr>
            <td><input type="text" class="heading_2" name="attr_Reputations$$"/></td>
            <td><input type="text" class="heading_2a" name="attr_Reputations$$_type"/></td>
            <td><input type="text" class="number_1" style="width:50px;" name="attr_Reputations$$_score"/></td>
            <td><div class="flex-container-center">
                <button type="roll" class="button simple-roll" name="roll_reputation$$_simple" value="{reputation_template.simple}"></button>
                <button type="roll" class="button stress-roll" name="roll_reputation$$_stress" value="{reputation_template.stress}"></button>
            </div></td>
        </tr>"""
    ),
    replace="$$",
    by=list(map(str, range(1, 7))),
)
