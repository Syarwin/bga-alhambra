<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Alhambra implementation : © Gregory Isabelli
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * stats.inc.php
 *
 *
 */
/*
    In this file, you are describing game statistics, that will be displayed at the end of the
    game.

    !! After modifying this file, you must use "Reload  statistics configuration" in BGA Studio backoffice
    ("Control Panel" / "Manage Game" / "Your Game")

    There are 2 types of statistics:
    _ table statistics, that are not associated to a specific player (ie: 1 value for each game).
    _ player statistics, that are associated to each players (ie: 1 value for each player in the game).

    Statistics types can be "int" for integer, "float" for floating point values, and "bool" for boolean

    Once you defined your statistics there, you can start using "initStat", "setStat" and "incStat" method
    in your game logic, using statistics names defined below.

    !! It is not a good idea to modify this file when a game is running !!

    If your game is already public on BGA, please read the following before any change:
    http://en.doc.boardgamearena.com/Post-release_phase#Changes_that_breaks_the_games_in_progress

    Notes:
    * Statistic index is the reference used in setStat/incStat/initStat PHP method
    * Statistic index must contains alphanumerical characters and no space. Example: 'turn_played'
    * Statistics IDs must be >=10
    * Two table statistics can't share the same ID, two player statistics can't share the same ID
    * A table statistic can have the same ID than a player statistics
    * Statistics ID is the reference used by BGA website. If you change the ID, you lost all historical statistic data. Do NOT re-use an ID of a deleted statistic
    * Statistic name is the English description of the statistic as shown to players

*/

$stats_type = [
  // Statistics global to table
  "table" => [
    "longest_wall_all" => [
      "id"=> 10,
      "name" => totranslate("Longest wall length"),
      "type" => "int"
    ],

    "turn_number" => [
      "id"=> 11,
      "name" => totranslate("Number of turn"),
      "type" => "int"
    ]
  ],

  // Statistics existing for each player
  "player" => [
    "longest_wall" => [
      "id"=> 10,
      "name" => totranslate("Longest wall length"),
      "type" => "int"
    ],
    "points_win_1" => [
      "id"=> 11,
      "name" => totranslate("Points wins during the first scoring round"),
      "type" => "int"
    ],
    "points_win_2" => [
      "id"=> 12,
      "name" => totranslate("Points wins during the second scoring round"),
      "type" => "int"
    ],
    "points_win_3" => [
      "id"=> 13,
      "name" => totranslate("Points wins during the third scoring round"),
      "type" => "int"
    ],
    "transformation_nbr" => [
      "id"=> 14,
      "name" => totranslate("Number of Alhambra transformation action"),
      "type" => "int"
    ],
    "money_taken" => [
      "id"=> 15,
      "name" => totranslate("Value of money taken"),
      "type" => "int"
    ],
    "exact_amount" => [
      "id"=> 16,
      "name" => totranslate("Number of exact amount replay"),
      "type" => "int"
    ],
  ]
];
